{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {
    nixpkgs,
    ...
  }: let
    systems = [ "x86_64-linux" "aarch64-linux" ];
    forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f {
      pkgs = nixpkgs.legacyPackages.${system};
    });
  in {
    devShells = forAllSystems ({ pkgs }: {
      default = pkgs.mkShell {
        packages = [
          pkgs.ergogen
          # for footprint lsp
          pkgs.typescript
          pkgs.nodejs_22
        ];
      };
    });
  };
}
