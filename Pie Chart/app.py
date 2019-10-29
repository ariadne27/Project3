import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Samples_Metadata = Base.classes.models2
Samples = Base.classes.models3
Performance = Base.classes.performance


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

# @app.route('/', methods=['POST'])
# def my_form_post():
#     calculate = request.form['calculate'] == "Calculate"
    
#     if calculate: 
#         investment = request.form['userInput']
#     else:
#         investment = 0
#     return investment

@app.route("/metadata/<RT>")

def sample_metadata(RT):
    """Return the MetaData for a given sample."""
    sel = [
        Samples_Metadata.RT,
        Samples_Metadata.KL,
        Samples_Metadata.RH,
        Samples_Metadata.CPRT,
        Samples_Metadata.MTZ,
        Samples_Metadata.ESNT,
        Samples_Metadata.EW,
        Samples_Metadata.EDU,
        Samples_Metadata.PAYC,
        Samples_Metadata.CDW,
        Samples_Metadata.LULU,
        Samples_Metadata.VEEV,
    ]

    results = db.session.query(*sel).filter(Samples_Metadata.RT == RT).all()

    # Create a dictionary entry for each row of metadata information
    sample_metadata = {}
    for result in results:
        # sample_metadata["Risk Tolerance"] = result[0]
        sample_metadata["KL"] = result[1]
        sample_metadata["RH"] = result[2]
        sample_metadata["CPRT"] = result[3]
        sample_metadata["MTZ"] = result[4]
        sample_metadata["ESNT"] = result[5]
        sample_metadata["EW"] = result[6]
        sample_metadata["EDU"] = result[7]
        sample_metadata["PAYC"] = result[8]
        sample_metadata["CDW"] = result[9]
        sample_metadata["LULU"] = result[10]
        sample_metadata["VEEV"] = result[11]

        

    print(sample_metadata)
    return jsonify(sample_metadata)


@app.route("/samples/<RT>")
def samples(RT):
    """Return `key`, `stock`,and `sample_values`."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df[RT] > 0,["key", "stock", RT]]

    # Sort by sample
    # sample_data.sort_values(by=RT, ascending=False, inplace=True)

    # Format the data to send as json
    data = {
        "key": sample_data.key.tolist(),
        "sample_values": sample_data[RT].values.tolist(),
        "stock": sample_data.stock.tolist(),
    }
    return jsonify(data)

# @app.route("/performance/<RT>")
# def performance(RT):
#     """Return `key`, `stock`,and `sample_values`."""
#     stmt = db.session.query(Performance).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[RT] > 0,["Date", "RUSS2000", "SP500", RT]]

#     # Sort by sample
#     # sample_data.sort_values(by=RT, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "date": sample_data.Date.tolist(),
#         "sample_values2": sample_data[RT].values.tolist(),
#         "RUS2000": sample_data.RUSS2000.tolist(),
#         "SP5":sample_data.SP500.tolist()
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
