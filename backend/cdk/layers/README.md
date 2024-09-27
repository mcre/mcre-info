## requests-2.32.3.zip

```
docker run -it --rm --platform linux/amd64 -v $PWD/layers:/layers --entrypoint="" amazon/aws-lambda-python:3.12 /bin/bash
cd /layers
mkdir python
pip install -t ./python requests
exit
cd layers
zip -r requests-2.32.3.zip python
```
