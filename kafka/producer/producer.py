from kafka import KafkaProducer
import json
import random

# Instance of Kafka producer
producer = KafkaProducer(bootstrap_servers='localhost:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))

# Send data
for x in range(1, 10000):
    producer.send('kafka-python-topic', x * random.randint(1,999))
