import amqp from 'amqplib'
class Rabbit{
    connectURL!: string;
    con!: amqp.Connection;
    channel!:amqp.Channel;
    constructor(url:string){
        this.connectURL = url;
    }
    public async sendMessage(q:string,msg:string){
        this.con = await amqp.connect(this.connectURL);
        this.channel = await this.con.createChannel()
        this.channel.assertQueue(q,{
            durable:true
        })
        this.channel.sendToQueue(q,Buffer.from(msg));
        console.log("[x] has send the message: "+msg);
        setTimeout(()=>{
            this.con.close();
            process.exit(0);
        },500)
    }
}

var rabbit = new Rabbit("amqp://localhost");
rabbit.sendMessage('hi','Hi! There');
