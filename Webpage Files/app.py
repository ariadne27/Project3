import os

# import pandas as pd
# import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/aromas.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.attributes
# # Samples = Base.classes.ID


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


# @app.route("/names")
# def names():
#     """Return a list of sample names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples_Metadata).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.ID)[2:])


# @app.route("/metadata/<ID>")
# def sample_metadata(ID):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.ID,
#         Samples_Metadata.tier_1,
#         Samples_Metadata.tier_2,
#         Samples_Metadata.attribute,
#         Samples_Metadata.wine1,
#         Samples_Metadata.wine2,
#         Samples_Metadata.wine3,
#         Samples_Metadata.wine4,
#         Samples_Metadata.wine5, 
#         Samples_Metadata.score, 
#         Samples_Metadata.price
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.ID == ID).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["ID"] = result[0]
#         sample_metadata["Attribute"] = result[3]
#         sample_metadata["Average Score"] = result[9]
#         sample_metadata["Average Price"] = result[10]
#         sample_metadata["Wine 1"] = result[4]
#         sample_metadata["Wine 2"] = result[5]
#         sample_metadata["Wine 3"] = result[6]
#         sample_metadata["Wine 4"] = result[7]
#         sample_metadata["Wine 5"] = result[8]

#     print(sample_metadata)
#     return jsonify(sample_metadata)

# @app.route("/word_cloud")
# def word_cloud():
#     return render_template("word_cloud.html")


# # @app.route("/samples/<sample>")
# # def samples(sample):
# #     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
# #     stmt = db.session.query(Samples).statement
# #     df = pd.read_sql_query(stmt, db.session.bind)

# #     # Filter the data based on the sample number and
# #     # only keep rows with values above 1
# #     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

# #     # Sort by sample
# #     sample_data.sort_values(by=sample, ascending=False, inplace=True)

# #     # Format the data to send as json
# #     data = {
# #         "otu_ids": sample_data.otu_id.values.tolist(),
# #         "sample_values": sample_data[sample].values.tolist(),
# #         "otu_labels": sample_data.otu_label.tolist(),
# #     }
# #     return jsonify(data)


if __name__ == "__main__":
    app.run()
