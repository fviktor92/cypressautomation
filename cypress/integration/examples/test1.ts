describe('My First Test Suite', function ()
{
	let url: string = "https://www.seleniumeasy.com/test/";
	it('My First Test Case', function ()
	{
		cy.visit(url)
	});
});