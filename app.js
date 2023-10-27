const express = require('express');
const { ethers } = require('ethers');
const app = express();
const port = 3000; 

const ALCHEMY_API_KEY = 'cyA-yTv8vgRXyLKn7ylGNSQzY0X3LOf_';
const alchemyUrl = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;


const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

app.use(express.json()); 

app.get('/getbalance', async (req, res) => {
    const address = req.query.address; 

    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
      
        const balance = await provider.getBalance(address);
        const etherBalance = ethers.utils.formatEther(balance);

        res.json({ address, balance: etherBalance + ' ETH' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
