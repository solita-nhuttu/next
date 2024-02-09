FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN --mount=type=secret,id=NEXT_PUBLIC_TESTATAAN \
  --mount=type=secret,id=AZURE_CONNECTION_STRING \
  --mount=type=secret,id=NEXT_PUBLIC_HEY \
  --mount=type=secret,id=TEST_ENV \
   export NEXT_PUBLIC_TESTATAAN=$(cat /run/secrets/NEXT_PUBLIC_TESTATAAN) && \
   export NEXT_PUBLIC_HEY=$(cat /run/secrets/NEXT_PUBLIC_HEY) && \
   export AZURE_CONNECTION_STRING=$(cat /run/secrets/AZURE_CONNECTION_STRING) && \
   export TEST_ENV=$(cat /run/secrets/TEST_ENV) && \
   npm run build

EXPOSE 3000

CMD npm run start