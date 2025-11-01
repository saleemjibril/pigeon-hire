import axios from "axios";



export const getStripePlans = async () => {
    
    const config = {
      headers: {
        Authorization: `Bearer sk_test_51RovxBAHGAMUCpPmWWIKL9h0d16qCMFRVTSZOWF5hQi1bI36b1DZpNhccpC79uyGI1eRbuYZU4X2a1GkvNfdrNXy00FBSPRA6O`,
        'Content-Type': 'application/json'
      },
    };
  
    const res = await axios.get(
      `https://api.stripe.com/v1/plans?limit=100`,
      config
    );
    
    console.log("Stripe plans response:", res);
    return res;
  };