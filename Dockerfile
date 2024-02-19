FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i

ENV NODE_ENV=production

COPY . .

RUN --mount=type=secret,id=NEXT_PUBLIC_TESTATAAN \
  --mount=type=secret,id=NEXT_PUBLIC_HEY \
  --mount=type=secret,id=COSMOS_CONNECTION_STRING \
   export NEXT_PUBLIC_TESTATAAN=$(cat /run/secrets/NEXT_PUBLIC_TESTATAAN) && \
   export COSMOS_CONNECTION_STRING=$(cat /run/secrets/COSMOS_CONNECTION_STRING) && \
   export NEXT_PUBLIC_HEY=$(cat /run/secrets/NEXT_PUBLIC_HEY) && \
   npm run build

EXPOSE 3000

CMD npm run start