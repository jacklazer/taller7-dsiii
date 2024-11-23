from confluent_kafka import Producer

producer_config = {
    'bootstrap.servers': 'kafka-broker-1:29092',  
    'client.id': 'auth-service',  
}

producer = Producer(producer_config)

producer.produce('univalle-ideas', key=None, value="Hola chavales, soy Juan C")
            
producer.flush()
