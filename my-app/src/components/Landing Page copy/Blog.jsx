import React from 'react'
import "../../styles/Blog.css"

import blog1 from "./../../images/images/cat-post-1.jpg"
import blog2 from "./../../images/images/cat-post-2.jpg"
import blog3 from "./../../images/images/cat-post-3.jpg"
import Leftside from "./../../images/images/m-blog-1.jpg"
import Leftside1 from "./../../images/images/m-blog-2.jpg"
import Leftside2 from "./../../images/images/m-blog-4.jpg"
import authorimage from "./../../images/images/author.png"



const Blog = () => {
    return (
        <>
            <div className="blog-section">

                <section className="card-section">
                    <div className="card">
                        <img src={blog3} alt="" />

                        <div className="overlay">
                            <div className='overlay-box'>



                                <h2>SOCIAL LIFE</h2>
                                <p>Enjoy your social life together</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog2} alt="" />
                        <div className="overlay">
                            <div className='overlay-box'>


                                <h2>POLITICS</h2>
                                <p>Be a part of politics</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog1} alt="" />

                        <div className="overlay">
                            <div className='overlay-box'>

                                <h2>FOOD</h2>
                                <p>Let the food be finished</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="blog-container">
                    {/* LEFT BLOG CONTENT */}
                    <div className="blog-left">

                        {/* FIRST BLOG POST */}
                        <div className="blog-top">

                            <div className="blog-meta">
                                <span>
                                    Food, <a href="#">Technology</a>, Politics, Lifestyle
                                </span>
                                <ul>
                                    <li>👤 Mark wiens</li>
                                    <li>📅 12 Dec, 2017</li>
                                    <li>👁 1.2M Views</li>
                                    <li>💬 06 Comments</li>
                                </ul>
                            </div>

                            <div className="blog-content">
                                <div className="blog-image">
                                    <img src={Leftside} alt="coffee" />
                                </div>

                                <h2 className="blog-title">
                                    Astronomy Binoculars A Great Alternative
                                </h2>

                                <p className="blog-desc">
                                    MCSE boot camps have its supporters and its detractors.
                                    Some people do not understand why you should have to spend
                                    money on boot camp when you can get the MCSE study materials
                                    yourself at a fraction of the cost.
                                </p>

                                <button className="blog-btn">View More</button>
                            </div>

                        </div>

                        {/* SECOND BLOG POST — BUTTON KE BAAD */}
                        <div className="blog-top second-post">

                            <div className="blog-meta">
                                <span>
                                    Food, <a href="#">Technology</a>, Politics, Lifestyle
                                </span>
                                <ul>
                                    <li>👤 Mark wiens</li>
                                    <li>📅 12 Dec, 2017</li>
                                    <li>👁 1.2M Views</li>
                                    <li>💬 06 Comments</li>
                                </ul>
                            </div>

                            <div className="blog-content">
                                <div className="blog-image">
                                    <img src={Leftside1} alt="blog" />
                                </div>

                                <h2 className="blog-title">
                                    The Basics Of Buying A Telescope
                                </h2>

                                <p className="blog-desc">
                                    MCSE boot camps have its supporters and its detractors.
                                    Some people do not understand why you should have to spend
                                    money on boot camp when you can get the MCSE study materials
                                    yourself at a fraction of the cost.
                                </p>

                                <button className="blog-btn">View More</button>
                            </div>

                        </div>
                        <div className="blog-top third-post">

                            <div className="blog-meta">
                                <span>
                                    Food, <a href="#">Technology</a>, Politics, Lifestyle
                                </span>
                                <ul>
                                    <li>👤 Mark wiens</li>
                                    <li>📅 12 Dec, 2017</li>
                                    <li>👁 1.2M Views</li>
                                    <li>💬 06 Comments</li>
                                </ul>
                            </div>

                            <div className="blog-content">
                                <div className="blog-image">
                                    <img src={Leftside2} alt="blog" />
                                </div>

                                <h2 className="blog-title">
                                    The Night Sky

                                </h2>

                                <p className="blog-desc">

                                    MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.
                                </p>

                                <button className="blog-btn">View More</button>
                            </div>

                        </div>


                    </div>


                    {/* RIGHT SIDEBAR */}
                    <div className="blog-right">

                        <div className="author-box">
                            <div className="search-box">
                                <input type="text" placeholder="Search Posts" />
                                <span>🔍</span>
                            </div>
                            <div className="sidebar-divider"></div>
                            <img
                                src={authorimage}
                                alt="author"
                            />
                            <h3>Charlie Barber</h3>
                            <p>Senior blog writer</p>
                            <div className="social-icons">
                                <span>🐦</span>
                                <span>📘</span>
                                <span>💼</span>
                                <span>📸</span>
                            </div>
                            <p className="author-desc">

                                Boot camps have its supporters andit sdetractors. Some people do not understand why you should have to spend money on boot camp when you can get. Boot camps have itssuppor ters andits detractors.
                            </p>

                            {/* DIVIDER LINE */}
                            <div className="sidebar-divider"></div>

                            {/* POPULAR POSTS */}
                            <div className="popular-posts">
                                <h3 className="popular-title">Popular Posts</h3>

                                <div className="post-item">
                                    <img src="https://preview.colorlib.com/theme/medicare2/img/blog/popular-post/post1.jpg" alt="" />
                                    <div>
                                        <h4>Space The Final Frontier</h4>
                                        <span>02 Hours ago</span>
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="https://preview.colorlib.com/theme/medicare2/img/blog/popular-post/post2.jpg" alt="" />
                                    <div>
                                        <h4>The Amazing Hubble</h4>
                                        <span>02 Hours ago</span>
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="https://preview.colorlib.com/theme/medicare2/img/blog/popular-post/post3.jpg" alt="" />
                                    <div>
                                        <h4>Astronomy Or Astrology</h4>
                                        <span>03 Hours ago</span>
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="https://preview.colorlib.com/theme/medicare2/img/blog/popular-post/post4.jpg" alt="" />
                                    <div>
                                        <h4>Asteroids telescope</h4>
                                        <span>01 Hours ago</span>
                                    </div>

                                </div>
                            </div>
                            <div className="sidebar-divider"></div>
                            <div className="ad-box">
                                <img
                                    src="https://preview.colorlib.com/theme/medicare2/img/blog/add.jpg"
                                    alt="advertisement"
                                />
                                <span className="ad-text"> <br /> </span>
                            </div>

                             <div className="sidebar-divider"></div>

                            {/* POST CATEGORIES */}
                            <div className="post-categories">
                                <h3 className="categories-title">Post Categories</h3>

                                <ul className="categories-list">
                                    <li>
                                        <span>Technology</span>
                                        <span>37</span>
                                    </li>
                                    <li>
                                        <span>Lifestyle</span>
                                        <span>24</span>
                                    </li>
                                    <li>
                                        <span>Fashion</span>
                                        <span>59</span>
                                    </li>
                                    <li>
                                        <span>Art</span>
                                        <span>29</span>
                                    </li>
                                    <li>
                                        <span>Food</span>
                                        <span>15</span>
                                    </li>
                                    <li>
                                        <span>Architecture</span>
                                        <span>09</span>
                                    </li>
                                    <li>
                                        <span>Adventure</span>
                                        <span>44</span>
                                    </li>
                                </ul>
                            </div>


                        </div>


                    </div>
                </div>
            </div>


        </>
    )
}

export default Blog