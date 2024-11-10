import sdwebui, { SamplingMethod } from 'node-sd-webui'

function getClient(apiUrl='http://localhost:3030') {
    var props = {
        apiUrl: apiUrl
    }
    return sdwebui(props=props);
}

export default async function generateImage(
    prompt='',
    negativePrompt='blurry, ugly, weird, distorted',
    savePath='image.png',
) {
    const client = getClient();
    
    try {
        const { images } = await client.txt2img({
            prompt: prompt,
            negativePrompt: negativePrompt,
            samplingMethod: SamplingMethod.DPMPlusPlus_2S_A_Karras,
            width: 1024,
            height: 1024,
            steps: 20,
        })
        writeFileSync(savePath, images[0], 'base64');
        console.log(`Saved to: ${savePath}`);
        return savePath;
    } catch (err) {
        console.error(err);
        return "False";
    }
}
