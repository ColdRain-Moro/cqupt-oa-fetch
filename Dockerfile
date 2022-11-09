FROM node

COPY ./ cqupt-oa-fetch/
WORKDIR /cqupt-oa-fetch

# 换源
RUN npm config set registry https://registry.npm.taobao.org && npm install

CMD ["npm", "run", "start"]