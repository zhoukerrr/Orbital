import * as React from "react";
import { eventStatus } from "../../types";
import TypeButtonGroup, { TypeButtonGroupProps } from "./TypeButtonGroup";

export default class EventTypeButtonGroup extends TypeButtonGroup {
  constructor(props: TypeButtonGroupProps) {
    super(props, eventStatus.concat());
  }
}
