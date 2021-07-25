import { reportStatus } from "../../types";
import TypeButtonGroup, { TypeButtonGroupProps } from "./TypeButtonGroup";

export default class ReportTypeButtonGroup extends TypeButtonGroup {
  constructor(props: TypeButtonGroupProps) {
    super(props, reportStatus.concat());
  }
}
