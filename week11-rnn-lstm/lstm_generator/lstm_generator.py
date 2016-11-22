# A2Z F16
# Daniel Shiffman
# http://shiffman.net/a2z
# https://github.com/shiffman/A2Z-F16

# Based entirely on: 
# https://github.com/fchollet/keras/blob/master/examples/lstm_text_generation.py

# this loads a model from lstm_generator_train
# and then generates text

from __future__ import print_function
import numpy as np
import random
import sys
import os

from keras.models import Sequential
from keras.models import load_model

# need original text
text = open("shakespeare_characters.txt").read()
# could convert everything to lower case
# text = open("shakespeare_characters.txt").read().lower()

# print('corpus length:', len(text))

# have to build the tables here too
chars = sorted(list(set(text)))
# print('total chars:', len(chars))
char_indices = dict((c, i) for i, c in enumerate(chars))
indices_char = dict((i, c) for i, c in enumerate(chars))

# print('Loading model...')
model = load_model('lstm_generate_model.h5')

# maxlen characters
maxlen = 40

def sample(preds, temperature=1.0):
    # helper function to sample an index from a probability array
    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds) / temperature
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.argmax(probas)

# pick a random phrase to see the model
start_index = random.randint(0, len(text) - maxlen - 1)

diversity = 1
if (len(sys.argv) > 1):
    diversity = float(sys.argv[1])

generated = ''
sentence = text[start_index: start_index + maxlen]
generated += sentence

for i in range(20):
    x = np.zeros((1, maxlen, len(chars)))
    for t, char in enumerate(sentence):
        x[0, t, char_indices[char]] = 1.

    preds = model.predict(x, verbose=0)[0]
    next_index = sample(preds, diversity)
    next_char = indices_char[next_index]

    generated += next_char
    sentence = sentence[1:] + next_char

    # sys.stdout.write(next_char)
    # sys.stdout.flush()
print(generated)
