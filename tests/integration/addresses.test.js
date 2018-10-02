

describe("Addresses", ()=>{
    describe("Addresses Endpoint", ()=>{
        it("GET Cep", async()=>{
            const { body } = await apiServer
                .get(`/v1/addresses/72405135`);
            expect(body).toHaveProperty("cep");
            expect(body).toHaveProperty("city");
        })
    });
});
