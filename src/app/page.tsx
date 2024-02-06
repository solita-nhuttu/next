export default function Page() {
  async function create(formData: FormData) {
    'use server';
    console.log(formData);
  }
 
  return (
    <div>

    <form action={create}>
      <input type="text" name="name" />
      <button className="flex justify-normal" type="submit">Submit</button>
      <div>
      pitäs toimia
      Hei! {process.env.NEXT_PUBLIC_TESTATAAN ?? 'Ei olla azuressa'}
      </div>
    </form>
    </div>
  );
}