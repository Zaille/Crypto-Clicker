const Profiles = artifacts.require("../contracts/Profiles.sol");

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Profiles', ([deployer, author, tipper]) => {
    let profiles;

    before(async () => {
        profiles = await Profiles.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await profiles.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
    });

    describe('profiles', async () => {
        let profile;

        before(async () => {
            profile = await profiles.createProfile({from: author});
        });

        it('Profile created', async () => {
            const event = profile.logs[0].args;
            assert.equal(event.amount, 0, 'Amount is correct');
            assert.equal(event.earnClick, 1, 'earnClick is correct');

            await profiles.createProfile({from: author}).should.be.rejected;
        });

        it('Find profile', async () => {
            assert.equal(await profiles.checkProfile({from: author}), true, 'Profile found');
            assert.equal(await profiles.checkProfile({from: "0x6825Adb74BBd38634875575A730De4c03cC24dfb"}), false, 'Profile not exist');
        });
    });
});