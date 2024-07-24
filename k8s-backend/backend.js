const express = require('express')
const bodyParser = require('body-parser')
const k8s = require('@kubernetes/client-node');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const kc = new k8s.KubeConfig();
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.post('/create-pods', async (req, res) => {
    const { podName, numOfPods, namespace, image } = req.body;

    for(let i=0; i< numOfPods; i++){
        const Pod = {
            apiVersion: "v1",
            kind: 'Pod',
            metadata: {
                name: `${podName}-${i}`
            },
            spec:{
                containers: [
                    {
                        name: podName,
                        image: image
                    }
                ]
            }
        };
        try{
            await k8sApi.createNamespacedPod(namespace, Pod)
        } catch(error){
            return res.status(500).send({ error: error.body.message });
        }
    }
    res.send({message: 'pods are created'});

});

app.post('/get-pods', async (req, res)=> {
    const{namespace} = req.body;
    
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});