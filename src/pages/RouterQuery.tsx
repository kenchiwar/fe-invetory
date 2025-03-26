import React from "react";
import { Checkbox, Radio } from "antd";
import  {useQueryParam}  from "@/helper/routerHelper"


interface Pizza {
  toppings: string[];
  crust: string;
  extraSauce: boolean;
}

function PizzaForm() {
  let [pizza, setPizza] = useQueryParam<Pizza>("pizza");

  if (!pizza) {
    pizza = { toppings: [], crust: "regular", extraSauce: false };
  }

  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    let form = event.currentTarget;
    let formData = new FormData(form);

    let pizza: Pizza = {
      toppings: formData.getAll("toppings") as string[],
      crust: formData.get("crust") as string,
      extraSauce: formData.get("extraSauce") === "on",
    };

    setPizza(pizza, { replace: true });
  }

  return (
    <div className="tw:p-4">
      <form onChange={handleChange} className="tw:space-y-4">
        <p className="tw:text-lg tw:font-semibold">
          What would you like on your pizza?
        </p>

        <div className="tw:space-y-2">
          <Checkbox
            defaultChecked={pizza.toppings.includes("pepperoni")}
            name="toppings"
            value="pepperoni"
          >
            Pepperoni
          </Checkbox>
          <Checkbox
            defaultChecked={pizza.toppings.includes("bell-peppers")}
            name="toppings"
            value="bell-peppers"
          >
            Bell Peppers
          </Checkbox>
          <Checkbox
            defaultChecked={pizza.toppings.includes("olives")}
            name="toppings"
            value="olives"
          >
            Olives
          </Checkbox>
        </div>

        <div className="tw:space-y-2">
          <Radio.Group defaultValue={pizza.crust} name="crust">
            <Radio value="regular">Regular Crust</Radio>
            <Radio value="thin">Thin Crust</Radio>
            <Radio value="deep-dish">Deep Dish</Radio>
          </Radio.Group>
        </div>

        <div className="tw:space-y-2">
          <Checkbox defaultChecked={pizza.extraSauce} name="extraSauce">
            Extra Sauce
          </Checkbox>
        </div>
      </form>

      <hr className="tw:my-4" />

      <p className="tw:font-medium">The current form values are:</p>

      <pre className="tw:bg-gray-100 tw:p-2">
        {JSON.stringify(pizza || {}, null, 2)}
      </pre>
    </div>
  );
}

export default PizzaForm;