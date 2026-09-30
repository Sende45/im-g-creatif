import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2, "Merci d'indiquer votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  pack: z.string().trim().optional(),
  message: z.string().trim().min(10, "Votre message est trop court."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 },
    );
  }

  try {
    const { name, email, pack, message } = parsed.data;
    await prisma.contactMessage.create({
      data: { name, email, pack: pack || null, message },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer votre message pour le moment." },
      { status: 500 },
    );
  }
}
