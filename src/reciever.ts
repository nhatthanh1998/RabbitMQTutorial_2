import amqp from 'amqplib'

class Reciever{
    connectURL!:string;
    connection!:amqp.Connection;
    channel!:amqp.Channel;
    constructor(url:string){
        this.connectURL = url;
    }
    public async getMessage(q:string){
        this.connection = await amqp.connect(this.connectURL);
        this.channel = await this.connection.createChannel();
        this.channel.assertQueue(q,{
            durable:true
        })
        console.log("Start listen for message from sender")
        this.channel.consume(q,msg=>{
            if(msg!=null){
                console.log("Recieve message:" + msg.content.toString())
            }
        });
    }
}

let reciever = new Reciever('amqp://localhost');
reciever.getMessage('hi');