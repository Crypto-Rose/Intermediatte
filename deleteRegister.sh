#!/bin/sh
#Parámetros de conexión
sql_host="localhost"
slq_usuario="root"
sql_password="0000"
sql_database="alaska"
#Monta los parámetros
sql_args="-h $sql_host -u $slq_usuario -p$sql_password -D $sql_database -s -e"
#Sentencia Sql
mysql $sql_args "DELETE FROM history_services WHERE DATE(date) < (NOW() - INTERVAL 7 DAY);"
