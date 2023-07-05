import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Show,
  SimpleShowLayout,
  TextInput,
  Edit,
  SimpleForm,
  Create,
  SelectInput,
  ReferenceInput,
  BulkUpdateButton,
  BulkDeleteButton,
} from "react-admin";
import { Fragment } from "react";

const invoiceItemFilters = [
  <TextInput label="Id" source="InvoiceLineId" alwaysOn />,
  <TextInput label="TrackId" source="TrackId" />,
  <TextInput label="Quantity" source="Quantity" />,
  <TextInput label="UnitPrice" source="UnitPrice" />,
  <TextInput label="InvoiceId" source="InvoiceId" />,
];

const bulkUpdateData = { UnitPrice: 0 };

const BulkActionButtons = () => (
  <Fragment>
    <BulkDeleteButton />
    <BulkUpdateButton label="Make free" data={bulkUpdateData} />
  </Fragment>
);

export function InvoiceItemList() {
  return (
    <List filters={invoiceItemFilters}>
      <Datagrid rowClick="show" bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <ReferenceField
          label="Track Name"
          source="TrackId"
          reference="tracks"
          link="show"
        />
        <TextField source="InvoiceId" />

        <ReferenceField
          label="Invoice Date"
          source="InvoiceId"
          reference="invoices"
          link="show"
        >
          <TextField source="InvoiceDate" />
        </ReferenceField>

        <TextField source="UnitPrice" />
        <TextField source="Quantity" />
        <EditButton />
      </Datagrid>
    </List>
  );
}

export function InvoiceItemShow() {
  return (
    <Show title="Invoice Item view">
      <SimpleShowLayout>
        <TextField source="id" />
        <ReferenceField source="TrackId" reference="tracks" />
        <TextField source="InvoiceId" />
        <TextField source="UnitPrice" />
        <TextField source="Quantity" />
      </SimpleShowLayout>
    </Show>
  );
}

export function InvoiceItemEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceInput label="Invoice" source="InvoiceId" reference="invoices">
          <SelectInput />
        </ReferenceInput>
        <ReferenceInput label="Track" source="TrackId" reference="tracks">
          <SelectInput />
        </ReferenceInput>
        <TextInput source="UnitPrice" />
        <TextInput source="Quantity" />
      </SimpleForm>
    </Edit>
  );
}

export function InvoiceItemCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput label="Invoice" source="InvoiceId" reference="invoices">
          <SelectInput />
        </ReferenceInput>
        <ReferenceInput label="Track" source="TrackId" reference="tracks">
          <SelectInput />
        </ReferenceInput>
        <TextInput source="UnitPrice" />
        <TextInput source="Quantity" />
      </SimpleForm>
    </Create>
  );
}
