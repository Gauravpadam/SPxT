#!/bin/bash

python -m venv backend3.10
source backend3.10/bin/activate
pip install -r requirements.txt
python server.py