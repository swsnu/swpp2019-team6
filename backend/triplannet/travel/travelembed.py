import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
import os

#tf.compat.v1.disable_eager_execution()


def travel_text_embed_vector(text):
    module_url = "/home/jdh/swpp-team6-project/swpp2019-team6/backend/triplannet/travel/encoder"
    #module_url = "./encoder"
    embed=hub.load(module_url)
    travel_embed=embed([text])
    travel_embed=100000*np.array(travel_embed)[0]
    travel_embed=travel_embed.astype(int)
    return list(travel_embed)
