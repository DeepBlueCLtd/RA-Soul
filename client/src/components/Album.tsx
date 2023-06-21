import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  ReferenceField,
  SimpleForm,
  TextInput,
  Edit,
  ReferenceInput,
  SelectInput,
  Create,
} from "react-admin";

export function AlbumList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="Title" />
        <ReferenceField
          label="Artist Name"
          source="ArtistId"
          reference="artists"
          link="show"
          sortBy="Name"
        >
          <TextField source="Name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
}

export function AlbumShow() {
  return (
    <Show title="Album view">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="Title" />
        <TextField source="ArtistId" />
        <ReferenceField
          label="Artist Name"
          source="ArtistId"
          reference="artists"
          link="show"
        />

        <ReferenceManyField label="Tracks" target="AlbumId" reference="tracks">
          <Datagrid>
            <TextField source="Name" />
            <TextField source="Composer" />
            <TextField source="GenreId" />
            <TextField source="Milliseconds" />
            <TextField source="Bytes" />
            <TextField source="UnitPrice" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}

export function AlbumEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="Title" />
        <ReferenceInput label="Artist" source="ArtistId" reference="artists">
          <SelectInput optionText="Name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}

export function AlbumCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="Title" />
        <ReferenceInput label="Artist" source="ArtistId" reference="artists">
          <SelectInput optionText="Name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
