FROM python:3.8-buster
WORKDIR /opt/app
ENV PYTHONBUFFERED=1

RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/pip_cache
COPY requirements.txt start /opt/app/
COPY .pip_cache /opt/app/pip_cache
COPY . /opt/app

EXPOSE 8000
CMD ["/opt/app/start"]
