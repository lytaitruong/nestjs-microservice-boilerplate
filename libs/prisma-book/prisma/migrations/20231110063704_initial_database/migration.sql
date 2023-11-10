-- CreateTable
CREATE TABLE "books" (
    "id" VARCHAR(28) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "image" TEXT,
    "genres" TEXT[],
    "author_id" VARCHAR(28) NOT NULL,
    "page" INTEGER,
    "description" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" VARCHAR(28) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
