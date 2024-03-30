"use client";

import { Button, Input, Label } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/schemas/categorySchema";

function CategoryForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const category = await res.json();
    console.log(category);
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Nombre de la Categoría</Label>
      <Input {...register("name")} />
      {errors.name?.message && (
        <p className="text-red-500">{errors.name?.message}</p>
      )}

      <Label>Descripción de la Categoría</Label>
      <Input {...register("description")} />

      <Label>Publicado</Label>
      <Input type="checkbox" {...register("published")} />

      <Button className="block mt-2">Crear Categoría</Button>
    </form>
  );
}

export default CategoryForm;
