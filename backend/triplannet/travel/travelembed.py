import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd

#tf.compat.v1.disable_eager_execution()


def travel_text_embed_vector(text):
    module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
    embed=hub.load(module_url)
    travel_embed=embed([text])
    return np.array(travel_embed)[0]
