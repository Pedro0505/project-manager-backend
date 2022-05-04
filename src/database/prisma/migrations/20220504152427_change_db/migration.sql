-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uuid" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_column" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 999,
    "title" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "workspace_column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_card" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 999,
    "content" TEXT NOT NULL,
    "title" TEXT,
    "column_id" TEXT NOT NULL,

    CONSTRAINT "workspace_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_column" ADD CONSTRAINT "workspace_column_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_card" ADD CONSTRAINT "workspace_card_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "workspace_column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
