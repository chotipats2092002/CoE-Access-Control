FROM golang:latest

WORKDIR /app

COPY . .


RUN GO111MODULE=on 

CMD ["sh", "-c", "go run *.go"]

# CMD ["sleep","50000"]
