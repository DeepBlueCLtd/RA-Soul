import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  EditButton,
  Show,
  SimpleShowLayout,
} from "react-admin";

const genreFilters = [
  <TextInput label="Id" source="GenreId" alwaysOn />,
  <TextInput label="Name" source="Name" />,
];

export function GenreList() {
  return (
    <List filters={genreFilters}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="Name" />
        <EditButton />
      </Datagrid>
    </List>
  );
}

export function GenreCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
}

export function GenreEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="GenreId" disabled />
        <TextInput source="Name" />
      </SimpleForm>
    </Edit>
  );
}

export function GenreShow() {
  return (
    <Show title="Genre view">
      <SimpleShowLayout>
        <TextField source="GenreId" />
        <TextField source="Name" />
      </SimpleShowLayout>
    </Show>
  );
}
