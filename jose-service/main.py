import time
from confluent_kafka import Producer

producer_config = {
    'bootstrap.servers': 'kafka-broker-1:29092',  
    'client.id': 'auth-service',  
}

producer = Producer(producer_config)

while True:
    producer.produce('univalle-ideas', key=None, value="Buenas a todos, soy Jose Manuel :D")
                
    producer.flush()
    
    time.sleep(5)
