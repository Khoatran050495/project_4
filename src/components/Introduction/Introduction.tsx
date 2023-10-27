import "./Introduction.css";

import React from "react";

import { images } from "../../assets/img/img";

type Props = {};

const Introduction: React.FC = (props: Props) => {
  return (
    <div className="introduce">
      <h2>Hello Customers!!!</h2>
      <p>
        We are the staff with many years of experience in the automotive
        industry, specializing in brokerage services, buying and selling cars,
        transferring names, withdrawing documents, checking cars. Committed to
        always serving 24/7, working from home or anywhere. Whenever you have a
        need to buy or sell a car, please contact us immediately. Committed to
        providing the fastest support.
      </p>
      <div className="imgintroduce1">
        <div className="imgintroduce">
          <img src={images.Backgroud} alt="caption" />
        </div>
      </div>

      <p>
        In Vietnam in general and Da Nang in particular, now the demand for car
        services is very much, the demand for buying and selling, changing car
        names, taking care of cars is very large, we realize that some services
        are still lacking. Useful necessary services about cars, so we -
        thegioixeluot.com.vn would like to serve you the following services:
      </p>
      <h5>
        <b>1. RIFLE:</b>
      </h5>
      <p>
        In order to meet the increasing demand for car use, if you are an
        individual or an organization (business / company) with a source of idle
        cars. Business people, doing business in the field of car rental
        Traveling Or simply individuals/organizations who want to find more
        income from their idle car You can choose to cooperate with reputable
        car rental companies, Make sure your car can help you generate a good
        profit while maintaining quality.
      </p>
      <div className="imgintroduce1">
        <div className="imgintroduce">
          <img src={images.Backgroud1} alt="caption" />
        </div>
      </div>
      <h5>
        <b>2. PISTOLS:</b>
      </h5>
      <p>
        It usually takes a long time to sell a used car and then buy a new car.
        Sometimes the driver is forced to charge the price during the buying and
        selling process, so the outstanding advantage of the car exchange
        service at thegioixeluot.com.vn will be the place you trust because of
        the process of buying and selling old cars for a good deal. New car
        takes place quickly in accordance with the process. at a fixed price and
        the money will be deducted when you buy a new car. So all you have to do
        is find yourself a car you like and use it. At the same time, when you
        come to thegioixeluot.com.vn, you will enjoy many special preferential
        policies in addition to discounts on vehicle maintenance and inspection
        services.
      </p>
      <div className="imgintroduce1">
        <div className="imgintroduce">
          <img src={images.Backgroud2} alt="caption" />
        </div>
      </div>
      <h5>
        <b>3. SNIPER :</b>
      </h5>
      <p>
        The used car segment is the most interested in because the income of
        Vietnamese people is still low. A large number of customers have a need
        to buy used cars, used cars have also increased in recent years. CAR
        WORLD currently has a program to buy and sell used cars for customers
        who need to use it. The advantage of this program is that with a limited
        budget, you can still own a luxurious and comfortable car, especially
        the absolute safety quality because it is thoroughly tested and meets
        your expectations. conventions of used car buyers. In addition, we also
        advise customers on financial packages (installment loans) suitable for
        each customer to buy the best car.
      </p>
      <div className="imgintroduce1">
        <div className="imgintroduce">
          <img src={images.Backgroud3} alt="caption" />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
