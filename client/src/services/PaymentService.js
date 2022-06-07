import web3 from './web3'
import rentalContract from './contract'

class PaymentService {

    connectWallet = async function () {
        const web3 = await web3()
        if(!web3) {
            return undefined
        }
    }

    getWalletAddress() {
      const renterWalletAddress = rentalContract.methods.getWalletAddress().call()
      return renterWalletAddress
    }
}

export default PaymentService