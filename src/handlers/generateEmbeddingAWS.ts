import axios from "axios";

async function generateEmbeddingAWS(text:string){
     try {
        const response = await axios.post(process.env.AWS_API_URL!,{text});
        return response.data.embedding
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     } catch (error) {
       console.log(error);
       
       throw new Error("Embedding process failed!");
     }
}

export default generateEmbeddingAWS;