FROM ubuntu:latest

RUN apt-get update
RUN apt-get install python3 -y
RUN apt install python3-pip -y && pip3 install --upgrade pip

RUN alias python=python3

COPY . .

RUN pip3 install -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN chmod 701 refreshDatabase.sh
RUN ./refreshDatabase.sh

CMD python3 manage.py runserver 0.0.0.0:8000
EXPOSE 8000
