// import { Button, Form, Switch } from "antd";
// import CreateField from "../../../components/Form/CreateField";
// import { dependsFields } from "../../../Forms/AddCase.form";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import { useState } from "react";


// export default function DependsForm(){
//   const [depends, setDepends] = useState(false);
//   return (
//     <>
//       <Form.Item valuePropName="checked" name="depends" label="He/She depends">
//         <Switch onChange={()=>setDepends(!depends)} />
//       </Form.Item>
//       {depends && (
//         <Form.List name="names">
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map((field) => (
//                 <div key={field.key} className="flex gap-2 ">
//                   <CreateField  {...dependsFields[0]} name={[field.name, dependsFields[0].name]}/>
//                   <CreateField  {...dependsFields[1]} name={[field.name, dependsFields[1].name]} />
//                   {fields.length > 1 ? (
//                     <Button className="items-center" onClick={() => remove(field.name)}>
//                       <MinusCircleOutlined />
//                     </Button>
//                   ) : null}
//                 </div>
//               ))}
//               <Form.Item>
//                 <Button className="w-full" type="dashed" onClick={() => add()}>
//                   <PlusOutlined /> Add Person
//                 </Button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>
//       )}
//     </>
//   )
// }