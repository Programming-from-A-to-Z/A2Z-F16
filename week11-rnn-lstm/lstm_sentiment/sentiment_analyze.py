# A2Z F16
# Daniel Shiffman
# http://shiffman.net/a2z
# https://github.com/shiffman/A2Z-F16

# Based entirely on: 
# https://github.com/thenomemac/IMDB-LSTM-Tutorial/blob/master/imdbLSTM.ipynb
# https://github.com/fchollet/keras/blob/master/examples/imdb_bidirectional_lstm.py

# Requires
# http://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz

from __future__ import print_function
import time
import numpy as np
np.random.seed(1337)  # for reproducibility
import os

from keras.models import load_model
from keras.preprocessing import sequence
from keras.models import Model, Sequential
from keras.layers import Dense, Dropout, Embedding, LSTM, Input, merge, BatchNormalization
from keras.datasets import imdb

from keras.preprocessing.text import Tokenizer
from keras.preprocessing import sequence

max_features = 10000
max_len = 200  # cut texts after this number of words (among top max_features most common words)


# Load training data
# directory = './testdb'
directory = './aclImdb'
# samples = 1001
samples = 12500
print('Loading data...');
X_train = []
y_train = []
path = directory + '/train/pos/'
X_train.extend([open(path + f).read() for f in os.listdir(path) if f.endswith('.txt')])
path = directory + '/train/neg/'
X_train.extend([open(path + f).read() for f in os.listdir(path) if f.endswith('.txt')])
# tokenize works to list of integers where each integer is a key to a word
# use the same training data
imdbTokenizer = Tokenizer(nb_words=max_features)
imdbTokenizer.fit_on_texts(X_train)

# Load the model
print('Loading model...')
model = load_model('model_bidir.h5')

test = "I would love to see this amazing wonderful awesome movie."
print(test)
test = imdbTokenizer.texts_to_sequences([test])
test = sequence.pad_sequences(test, maxlen=max_len)
result = model.predict(test)

print(result[0][0])

test = "I would hate to see this horrible awful terrible movie. It's the worst movie in the world."
print(test)
test = imdbTokenizer.texts_to_sequences([test])
test = sequence.pad_sequences(test, maxlen=max_len)
result = model.predict(test)

print(result[0][0])