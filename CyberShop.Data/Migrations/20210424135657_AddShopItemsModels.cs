using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberShop.Data.Migrations
{
    public partial class AddShopItemsModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShopItems",
                columns: table => new
                {
                    shop_item_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopItems", x => x.shop_item_id);
                });

            migrationBuilder.CreateTable(
                name: "ShopItemsImages",
                columns: table => new
                {
                    image_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    image = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    shop_item_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopItemsImages", x => x.image_id);
                    table.ForeignKey(
                        name: "FK_ShopItemsImages_ShopItems_shop_item_id",
                        column: x => x.shop_item_id,
                        principalTable: "ShopItems",
                        principalColumn: "shop_item_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShopItemsImages_shop_item_id",
                table: "ShopItemsImages",
                column: "shop_item_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopItemsImages");

            migrationBuilder.DropTable(
                name: "ShopItems");
        }
    }
}
