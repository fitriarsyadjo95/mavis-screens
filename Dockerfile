FROM node:20-slim

WORKDIR /app

RUN npm install -g serve@14.2.4

COPY . /app

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "serve . -l ${PORT:-3000}"]
