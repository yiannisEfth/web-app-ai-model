FROM python:3.8

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
COPY /saved_model /backend/saved_model
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY . .