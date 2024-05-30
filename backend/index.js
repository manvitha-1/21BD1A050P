const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

app.get("/api/category", async (req, res) => {
    try {
      const { category } = req.query;
      if (!category) {
        throw new Error("Category parameter is missing");
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDgzNDY1LCJpYXQiOjE3MTcwODMxNjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjE0NTc2YjVlLTM1ZjAtNGNmNy05MzU5LTZkOWI2YTUyNjlhNCIsInN1YiI6Im1hbnZpdGhhMjcwOUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjE0NTc2YjVlLTM1ZjAtNGNmNy05MzU5LTZkOWI2YTUyNjlhNCIsImNsaWVudFNlY3JldCI6Imt4dVBOR0d0TnlMT0p6TWMiLCJvd25lck5hbWUiOiJNYW52aXRoYSIsIm93bmVyRW1haWwiOiJtYW52aXRoYTI3MDlAZ21haWwuY29tIiwicm9sbE5vIjoiMjFiZDFhMDUwcCJ9.3d3W5z2E1VsiYc2k8QpyunZ_CK2mcmAqpLYz8tn8M1w";
      const headers = { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      let allProducts = [];
      for (let i = 0; i < companies.length; i++) {
        const company = companies[i];
        const apiUrl = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`;

        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
          throw new Error(`Failed to fetch data from external API for company: ${company}`);
        }

        const data = await response.json();
        allProducts = allProducts.concat(data);
      }

      res.status(200).json(allProducts);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
