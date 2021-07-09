import React from "react";
import {
	DatePick,
  Dropdown,
  TextInput,
  NumberInput,
  Buttons
} from "./index";

export default (item) => {
  switch (item.element) {
    case "Dropdown":
      return <Dropdown item={item} />;
    case "NumberInput":
      return <NumberInput item={item} />;
    case "TextInput":
			return <TextInput item={item} />;
		case "Date":
			return <DatePick item={item} />;
    case "Buttons":
      return <Buttons item={item} />;
		
  }
};
