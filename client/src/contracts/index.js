import contract from 'truffle-contract'
import rentalArtifact from '../../build/Rental'

const RentalContract = contract(rentalArtifact)

export {
    RentalContract
}