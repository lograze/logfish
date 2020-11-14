#!/bin/sh

APP_JS="$(ls main.*.js)"

sed -i -e "s|<CLICKHOUSE_URL>|${CLICKHOUSE_URL}|g" ${APP_JS}

serve -s
