import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div id="about">
      <div class="row pt-5">
        <div>
          <div class="row">
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-10">
                  <h1 id="landingHomePageLargeText">A Reddit Clone Made With React+Redux & Django</h1>
                  <div class="pt-3">
                    <p>Ribbit is a web application made with Django (backend api) and React.js + Redux (frontend). Made in
                      reference to Reddit, Ribbit provides features such as sharing posts, communities, and many more. Please check the video on the
                      features tab on the navbar concerning Ribbit's features and development.</p>
                  </div>
                  <form className="get-access">
                    <Link to="/home">
                      <button type="submit" className="get-access-btn">Go to Ribbit &nbsp;<i class="fas fa-sign-in-alt"></i></button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-5 pt-5">
              <iframe id="landingFunctionalitiesPageVideo"
                src="https://www.youtube.com/embed/8BLILMtfteE"
                title="Ribbit Promo Vid"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index;