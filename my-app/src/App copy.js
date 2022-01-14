import "./App.css";
import Moralis from "moralis/dist/moralis.min.js";

function App() {
  // connect to Moralis server
  const serverUrl = "https://iw1xgpjprgfe.usemoralis.com:2053/server";
  const appId = "bxnjIaGW9tTLKBNNqo99aQHTEgE67jwMRmjC4zHB";
  Moralis.start({ serverUrl, appId });

  // // bind button click handlers
  // document.getElementById("btn-login")?.onclick = login;
  // document.getElementById("btn-logout")?.onclick = logOut;
  // document.getElementById("btn-get-stats")?.onclick = getStats;
  // document.getElementById("btn-mint")?.onclick = getStats;
  // document.getElementById("btn-stake")?.onclick = getStats;

  // LOG IN WITH METAMASK
  async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate();
    }
    console.log("logged in user:", user);
    getStats();
  }

  // LOG OUT
  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  // refresh stats
  function getStats() {
    const user = Moralis.User.current();
    if (user) {
      getUserTransactions(user);
    }
    getAverageGasPrices();
  }

  // HISTORICAL TRANSACTIONS
  async function getUserTransactions(user) {
    // create query
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));

    // subscribe to query updates
    const subscription = await query.subscribe();
    handleNewTransaction(subscription);

    // run query
    const results = await query.find();
    console.log("user transactions:", results);
  }

  // REAL-TIME TRANSACTIONS
  async function handleNewTransaction(subscription) {
    // log each new transaction
    subscription.on("create", function (data) {
      console.log("new transaction: ", data);
    });
  }

  // CLOUD FUNCTION
  async function getAverageGasPrices() {
    const results = await Moralis.Cloud.run("getAvgGas");
    console.log("average user gas prices:", results);
    renderGasStats(results);
  }

  function renderGasStats(data) {
    const container = document.getElementById("gas-stats");
    container.innerHTML = data
      .map(function (row, rank) {
        return (
          <li>
            #${rank + 1}: ${Math.round(row.avgGas)} gwei
          </li>
        );
      })
      .join("");
  }

  //get stats on page load
  getStats();

  function initApp() {
    document.querySelector("#app").style.display = "block";
    document.querySelector("#submit_button").onclick = submit;
  }

  async function submit() {
    const input = document.querySelector("#input_image");
    let data = input.files[0];
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();
    const user = Moralis.User.current();

    let metadata = {
      name: document.querySelector("#input_name").value,
      description: document.querySelector("#input_description").value,
      image: "/ipfs/" + imageHash,
    };
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await jsonFile.saveIPFS();

    let metadataHash = jsonFile.hash();
    console.log(jsonFile.ipfs());
    let res = await Moralis.Plugins.rarible.lazyMint({
      chain: "matic",
      userAddress: user.get("ethAddress"),
      tokenType: "ERC721",
      tokenUri: "ipfs://" + metadataHash,
      royaltiesAmount: 5, // 0.05% royalty. Optional
    });
    console.log(res);
    // document.querySelector('#success_message').innerHTML =
    //     NFT minted. <a href="https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}">View NFT;
    document.querySelector("#success_message").style.display = "block";
    setTimeout(() => {
      document.querySelector("#success_message").style.display = "none";
    }, 5000);
  }

  return (
    <div className="App">
      <div class="container text-white">
        <ul id="gas-stats"></ul>

        <h1>Welcome to Crypto Trading Game</h1>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Contact
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            ...
          </div>
        </div>

        <div class="row">
          <button id="btn-login" onClick="login()">
            Connect Metamask
          </button>
          <button id="btn-logout" onClick="logout()">
            Logout
          </button>
          <button id="btn-get-stats" onClick="getStats()">
            Refresh Stats
          </button>
          <button id="btn-mint" onClick="getStats()">
            Mint AMBI
          </button>
          <button id="btn-stake" onClick="getStats()">
            Stake AMBI
          </button>
          <div class="col-8">
            <div class="card" style="width: 45rem">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Welcome to Trading Game</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Play Game
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword" />
            </div>
          </div>
          <button id="btn-login">Register</button>
        </div>

        <figure class="text-center">
          <h3>Description</h3>
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
          <h3>Game Rules</h3>
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>

        <div class="container">
          <div class="title">NFT Minter</div>
          <div class="row">
            <div id="app" class="col-md-6 offset-md-3">
              <div id="success_message"></div>
              <div class="form_element">
                <input
                  class="form-control"
                  type="text"
                  id="input_name"
                  name="name"
                  placeholder="Token name"
                />
              </div>
              <div class="form_element">
                <input
                  class="form-control"
                  type="text"
                  id="input_description"
                  name="description"
                  placeholder="Description"
                />
              </div>
              <div class="form_element">
                <input
                  class="form-control"
                  type="file"
                  id="input_image"
                  name="image"
                  accept="image/png, image/jpeg"
                />
              </div>
              <div class="form_element">
                <button
                  class="btn btn-primary btn-lg btn-block"
                  id="submit_button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
