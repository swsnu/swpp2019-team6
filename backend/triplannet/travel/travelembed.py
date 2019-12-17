import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
import os

#tf.compat.v1.disable_eager_execution()

class TravelEmbed:
    def __init__(self):
        self.module_path = "https://tfhub.dev/google/universal-sentence-encoder/4"
        self.embed=hub.load(self.module_path)

    def travel_text_embed_vector(self, text):
        travel_embed=self.embed([text])
        travel_embed=100000*np.array(travel_embed)[0]
        travel_embed=travel_embed.astype(int)
        return list(travel_embed)
